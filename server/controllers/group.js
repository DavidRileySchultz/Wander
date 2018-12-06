module.exports = {
    create: (req, res) => {
        return res.status(200).send({ message: "Create endpoint" })
    },
    invite: (req, res) => {
        return res.status(200).send({ message: "Invite endpoint"})
    },
    leave: (req, res) => {
        return res.status(200).send({ message: "Leave endpoint"})
    },
    remove: (req, res) => {
        return res.status(200).send({ message: "Remove endpoint"})
    },
    accept: (req, res) => {
        return res.status(200).send({ message: "Accept endpoint"})
    },
    contribute: (req, res) => {
        return res.status(200).send({ message: "Contribute endpoint"})
    }
}