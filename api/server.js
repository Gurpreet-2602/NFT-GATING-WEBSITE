const express = require("express")
const {Web3} = require("web3");
const cors = require('cors');

const ABI = require("./ABI.json");

const app = express();
app.use(cors());  
app.use(express.json())
const web3 = new Web3("https://damp-quick-daylight.ethereum-sepolia.discover.quiknode.pro/9439ff82f8a3ef2ca7ef5219e75ef65c05ba3612/");
const contractAddress = "0x9E036F98b1f46c656b8903ebA271E9112c986943";

const contract = new web3.eth.Contract(ABI,contractAddress);




const fetchNFTs = async(account)=>{
    try{
        const nftBalance = await contract.methods.balanceOf(account).call();
        return  {userNFTs:Number(nftBalance)}
    }catch(error){   
    console.error("Error in fetching NFT:",error);
    }
}

app.post('/members',async(req,res)=>{
    try{
        const account = req.body.from;
        const numNFTs = await fetchNFTs(account);
       console.log(numNFTs);
        if(numNFTs.userNFTs>0){
            res.status(200).json({status:200,numNFTs})
        }else{
            res.status(400).json({status:400,message:"You have 0 nfts",numNFTs})
        }
    }catch(error){
        res.status(500).json({status: 500,error:'Internal Server Error'})
    }
}) 

const PORT=3000;
const server = app.listen(PORT,()=>{
   console.log(`Server is running at ${PORT}`)
})