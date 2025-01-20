
const asyncHandler = (requestHandler)=>{
    (req, res, next) =>{
        Promise.resolve(requestHandler(req, res, next)).catch((err)=>{
            console.error(err)
            res.status(500).json({message: 'Server Error'})
        })
    }
}

// Another method
// const asyncHandler = (requestHandler) =>()=>{
//     return async (req, res) => {
//         try{
//             await requestHandler(req, res)
//         }
//         catch(err){
//             console.error(err)
//             res.status(500).json({success: false, message: 'Server Error'})
//         }
//     }
// }