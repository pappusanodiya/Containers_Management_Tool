const express = require("express")

const { exec }  = require("child_process")

const app = express()

app.get("/runform", (req, res) => {
        res.sendFile( __dirname + "/rundocker.html");
})

app.get("/run", (req, res) => {
        const cname = req.query.cname;
        const cimage = req.query.cimage;


//      res.send("hello");

        exec('docker run -dit --name ' + cname + " " + cimage , (err, stdout, stderr) => {
                console.log(stdout);
                res.send("<pre> Launch Successfuly...." + stdout + "</pre>");
        })
})


app.get("/ps", (req, res)=>{
        //exec("docker ps | tail -n +2 | awk '{ print '<h2>' , $2, $7, $10, '</h2>'}' " , (err, stdout, stderr)=> {                     //      res.send("<pre>" + stdout + "</pre>");
        //})

        exec("docker ps | tail -n +2", (err, stdout, stderr)=> {

                let a = stdout.split("\n");
                res.write("<table border='5' align='left' width='80%'>");
                res.write("<tr><th>Container ID</th><th>Image Name</th><th>Command</th><th>Container Name</th></tr>");

                a.forEach( (cdetails ) => {
                        cinfo =  cdetails.trim().split(/\s+/)
                        console.log(cinfo[0] + " " +  cinfo [1] + " " + cinfo[2])
                        res.write("<tr>" + "<td>" + cinfo[0] + "</td>" + "<td>" +  cinfo [1] + "</td>" + "<td>" + cinfo[2] + "</td>" + "<td>" + cinfo[ cinfo.length - 1 ] + "</td>" + "</tr>")
                })

                res.write("</table>")
                        res.send()
       //      res.send("<pre>" + stdout + "<pre>");
        })
})

app.get("/delete",(req, res)=>{
        exec('docker rm' + cname, (err, stdout, stderr) => {
                console.log(stdout);
                res.send("<pre>Deleted Container...." + stdout + "</pre>");
        })
})



app.listen(3000, () => { console.log("container app tool started ...") } )
                                                                                 
