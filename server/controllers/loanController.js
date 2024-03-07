const Loan = require("../models/Loan");
const Request = require("../models/Request");

const getAllLoans = async (req, res) => {
    if (req.user.role !== "edmit") {
        return res.status(400).json({ message: 'No permision' })
    }
    const loans = await Loan.find({}, { password: 0 }).populate("user", { password: 0 }).populate("request", { _id: 0 }).lean()
    // if (!loans?.length) {
    //     return res.status(400).json({ message: 'No laons found' })
    // }
    res.json(loans)
}
const getAllLoansByUser = async (req, res) => {
    const loans = await Loan.find({ user: req.user._id }).populate("request", { _id: 0 }).populate("user", { password: 0 }).lean()
    // if (!loans?.length) {
    //     return res.status(400).json({ message: 'No Loans found' })
    // }
    res.json(loans)
}

const createNewLoan = async (req, res) => {

    const { wefts, sign, returnDate, request } = req.body
    console.log(wefts);
    // const imageUrl = req.file.path; 
    // console.log(imageUrl);
    if (!wefts || !returnDate || !sign || !request) {
        return res.status(400).json({ message: 'fields are required' })
    }
    const loan = await Loan.create({ sign, returnDate, wefts, request, user: req.user._id, img: "" })
    if (loan) {
        return res.status(201).json({ message: 'New Loan created' })
    } else {
        return res.status(400).json({ message: 'Invalid Loan ' })
    }
}

// const getLoanById = async (req, res) => {
//     const { id } = req.params
//     const Loan = await Loan.findById(id).find({ user: req.user._id }).populate("user", { password: 0 }).lean()
//     if (!Loan) {
//         return res.status(400).json({ message: 'No Loan found' })
//     }
//     res.json(Loan)
// }

const updateLoan = async (req, res) => {
    const { _id, returnDate } = req.body
    if (!_id || !returnDate) {
        return res.status(400).json({ message: 'fields are required' })
    }
    const Loan = await Loan.findById(_id).exec()
    if (!Loan) {
        return res.status(400).json({ message: 'Loan not found' })
    }
    Loan.returnDate = returnDate
    const updatedLoan = await Loan.save()
    res.json(`One loan updated`)
}

const updateWeft = async (req, res) => {
    const { id, numWeft, name, email, phone, sign } = req.body

    if (!name || !id || !phone || !sign)
        return res.status(400).json({ message: 'fields are required' })
    const loan = await Loan.findById(id)
    if (!loan)
        return res.status(400).json({ message: 'fields are bad' })
    loan.wefts[numWeft] = { name: name, email: email, phone: phone, sign: sign };
    const updatedLoan = await loan.save()
    res.json(`One Weft updated`)
}

const updateLoanStatus = async (req, res) => {// עידכון אם ההלוואה הוחזרה
    const { id } = req.params
    const loan = await Loan.findById(id)
    if (!loan) {
        return res.status(400).json({ message: 'Loan not found' })
    }
    loan.status = !loan.status
    const updatedLoan = await loan.save()
    res.json(`One loan updated`)
}

const updateLoanApproval = async (req, res) => {// עידכון אם ההלוואה אושרה
    const { id } = req.params
    const loan = await Loan.findById(id)
    if (!loan) {
        return res.status(400).json({ message: 'Loan not found' })
    }
    if (loan.take) {
        return res.status(400).json({ message: "can not update loan" })
    }
    loan.approval = !loan.approval
    const updatedLoan = await loan.save()
    res.json(`One loan updated`)
}

const updateLoanTake = async (req, res) => {// עידכון אם ההלוואה נלקחה
    const { id } = req.params
    const loan = await Loan.findById(id)
    if (!loan) {
        return res.status(400).json({ message: 'Loan not found' })
    }
    if (loan.status || !loan.approval) {
        return res.status(400).json({ message: "can not update loan" })
    }
    loan.take = !loan.take
    const updatedLoan = await loan.save()
    res.json(`One loan updated`)
}
const updateReturnApproval = async (req, res) => {
    // console.log(req.file);
    const { id } = req.body
    // console.log(id);
    const imageUrl = req.file.path;    
    console.log(imageUrl);
    const loan = await Loan.findById(id)
    if (!loan) {
        return res.status(400).json({ message: 'Loan not found' })
    }

    if (!loan.take) {
        return res.status(400).json({ message: "can not update loan" })
    }
    loan.img = imageUrl
    const updatedLoan = await loan.save()
    res.json(`One loan updated`)
}

const deleteLoan = async (req, res) => {
    const { idL } = req.body
    const loan = await Loan.findById(idL).exec()
    console.log(loan);
    if (!loan) {
        return res.status(400).json({ message: 'Loan not found' })
    }
    const result = await loan.deleteOne()
    const reply = `Loan deleted`
    res.json(reply)  
}


module.exports = { getAllLoansByUser, getAllLoans, createNewLoan, updateLoan, updateLoanStatus, updateLoanApproval, updateLoanTake, deleteLoan, updateWeft ,updateReturnApproval}    