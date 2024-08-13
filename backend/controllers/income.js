const IncomeSchema= require("../models/incomeModel")

exports.addIncome= async (req,res) => {
    const {title, amount, category, description, date}=req.body
    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })

    console.log(income)
    try{
        if (!title || !category || !description || !date){
            return res.status(400).json({message:'all fileds are required!'})
        }
        if (amount <=0 || !amount === 'number'){
            return res.status(400).json({message: 'all must be positive'})
        }
        await income.save()
        res.status(200).json({message:'Income added'})
    }catch(error){

    }
}