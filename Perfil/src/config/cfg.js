const cfg = () => {
    return{
        jwt_secret:"#V$Code%",
        jwt_expires:"2d",
        salt:10,
        db_path:"mongodb://127.0.0.1:27017/bancodados"
    }
}
module.exports = cfg();