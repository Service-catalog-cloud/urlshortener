import express from 'express'
import morgan from 'morgan'

import {getUrl, newUrl} from '../lib/db';

let app: express.Application = express();
app.use(express.json());
app.use(morgan("common"))

app.get("/", async(req, res) => {
    res.redirect("/ui/")
})
app.post("/new", async (req, res) => {
    let url = req.body.url;
    let token: string = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    await newUrl(url, token).then(() => {
        res.send(JSON.stringify({"token": token}))
    }).catch(() => {
        res.send("something went wrong")
    })
})

app.get("/:token", async (req, res) => {
    let token = req.params.token
    await getUrl(token).then((data) => {
        if (data?.Item?.Url) {
            res.redirect(data?.Item?.Url)
        } else {
            res.send("invalid token")
        }
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`application listening on ${process.env.PORT || 3000}`)
})