require('dotenv').config()//for importing parameters
const Web3=require('web3');

//ABIs
const IFactory = require('@uniswap/v2-core/build/IUniswapV2Factory.json')
const IPair = require('@uniswap/v2-core/build/IUniswapV2Pair.json')  
const IRouter = require('@uniswap/v2-periphery/build/IUniswapV2Router02.json')
const Utils = require('../build/contracts/Utils.json')
const IERC20 = require('@uniswap/v2-periphery/build/IERC20.json')

let web3 = new Web3('wss://ws-mainnet.hecochain.com');

//importing parameters from .env (mostly given)
const addrDai = "0xa71EdC38d189767582C38A3145b5873052c3e47a"
const addrEth = "0x64FF637fB478863B7468bc97D30a5bF3A428a1fD"//indeed its weth, henceforth simply eth
const addrSFactory = process.env.BXHFactory
const addrSRouter = process.env.BXHRouter
const addrUFactory = process.env.MDEXFactory
const addrURouter = process.env.MDEXRouter





const uFactory = new web3.eth.Contract(IFactory.abi,"0xb0b670fc1F7724119963018DB0BfA86aDb22d941")
const uRouter = new web3.eth.Contract(IRouter.abi,"0xED7d5F38C79115ca12fe6C0041abb22F0A06C300")
const sFactory = new web3.eth.Contract(IFactory.abi,"0xe0367ec2bd4Ba22B1593E4fEFcB91D29DE6C512a")//sushiswap, same ABIs, sushiswap forked uniswap so, basically same contracts
const sRouter = new web3.eth.Contract(IRouter.abi,"0x96F3Ce39Ad2BfDCf92C0F6E2C2CAbF83874660Fc")
const token0 = new web3.eth.Contract(IERC20.abi,"0x64FF637fB478863B7468bc97D30a5bF3A428a1fD")//henceforth T0
const token1 = new web3.eth.Contract(IERC20.abi,"0xa71EdC38d189767582C38A3145b5873052c3e47a")//and T1



const newBlockEvent = web3.eth.subscribe('newBlockHeaders')

newBlockEvent.on('data',console.log)

//asyncs variables
let uPair0,uPair1,sPair,myAccount,token0Name,token1Name,token0Symbol,token1Symbol
async function asyncsVar() {
    //will be used to determine eth price later
    uPair0 = new web3.eth.Contract(IPair.abi, (await uFactory.methods.getPair(addrEth, addrDai).call()) )
    //token pairs
    uPair1 = new web3.eth.Contract(IPair.abi, (await uFactory.methods.getPair(token0.options.address, token1.options.address).call()) )
    sPair = new web3.eth.Contract(IPair.abi, (await sFactory.methods.getPair(token0.options.address, token1.options.address).call()) )

    //account with you will be using to sign the transactions
    //const accountObj = await web3.eth.accounts.privateKeyToAccount(privateKey)
    //myAccount = accountObj.address

    token0Name = await token0.methods.name().call()
    token0Symbol = await token0.methods.symbol().call()
    token1Name = await token1.methods.name().call()
    token1Symbol = await token1.methods.symbol().call()

    console.log(token0Name,token0Symbol,token1Name,token1Symbol);
}

asyncsVar()
