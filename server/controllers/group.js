const firebase = require('../firebase');

module.exports = {
    create: (req, res) => {
        let newGroup = {
            name: req.body.name,
            members: req.body.members || [],
            owner: req.body.creatorEmail
        }

        return firebase.database().ref(`groups`).push({
            groupDetails: newGroup
        }).then((createdGroup) => {
            return res.status(200).send({newGroup, message: "Create endpoint" })
        })
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