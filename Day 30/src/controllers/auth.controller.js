export async function registerUser(req,res, next){

    res.status(201).json({
        message: "User registered successfully"
    })

    
    // try{
    //     throw new Error("password is too weak");
    // } catch (err){
    //    err.status = 400
    //    next(err)
    // }

    //  try{
    //     throw new Error("User is");
    // } catch (err){
    //    err.status = 409
    //    next(err)
    // }

    // try{
    //     console.log(user);
        
    // } catch (err){
    //    err.status = 500
    //    next(err)
    // }
}

