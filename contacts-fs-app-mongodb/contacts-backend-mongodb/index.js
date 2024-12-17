const express=require("express");
const app=express();
const cors=require("cors");
const Contact=require("./models/contact")
app.use(cors());
app.use(express.json());
app.use(express.static("dist"))

const requestLogger=(req,res,next)=>{
    console.log(`Request Method: ${req.method}`)
    console.log(`Request URL: ${req.url}`)
    console.log("Request body:" ,req.body)
    console.log("--------------")
    next();
}
app.use(requestLogger)
const port = 3001;

app.post("/api/contacts",async (req,res)=>{
    const {name, email}=req.body;
    if(!name){
        res.status(400).json({error:"No name"})

    }
    if(!email){
        res.status(400).json({error:"No email"})
    } 
    else {
        const contact=new Contact({name, email})
        const savedContact=await contact.save();
        res.json(savedContact);
    }
})
app.get("/",(req,res)=>{
    res.send("What's up my goodie")
})

app.get("/api/info",(req,res)=>{
    res.send(`<h1>Contacts Web Server</h1>
        <p>Number of contacts: ${Contact.length}</p>`)
})

app.get("/api/contacts/:id", async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404).json({error: "Contact not found"})
    }
    else{ 
        res.json(contact)
    }
})

app.delete("/api/contacts/:id",(req,res)=>{
    const contact=contacts.find((m)=>m.id===Number(req.params.id));
    if(!contact){
        res.status(404).json({error: "Contact not found"})
    }
    else{
        contacts = contacts.filter((m)=>m.id!=req.params.id);
        res.status(204).json({message:"Contact deletion successful"})
    }
})



app.get("/api/contacts",async(req,res)=>{
    const contacts = await Contact.find({});
    console.log(contacts);
    res.json(contacts);
})

app.listen(port,()=>{
    console.log(`Server is running on ${port} `)
})