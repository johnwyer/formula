const express = require('express');
const router = express.Router();
const { Team } = require('../../models/team');

router.get('/teams', (req, res) => {
    Team.find({})
        .populate('country')
        .populate({ path: 'driver_1', select: 'id firstName lastName' })
        .populate({ path: 'driver_2', select: 'id firstName lastName' })
        .exec()
        .then((teams2) => {
            let teams = [];
            teams2.forEach((team) => {
                let item = {
                    ...team.toObject(),
                    teamLogo: (team.teamLogo.length > 0) ? team.teamLogo[0].url.toString() : '',
                    teamCarImage: (team.teamCarImage.length > 0) ? team.teamCarImage[0].url.toString() : ''
                };
                teams.push(item);
            });

            return res.status(200).send(teams);
        }).catch((error) => {
            return res.status(400).send(error);
        });
});

router.get('/team', (req, res) => {
    Team.findOne({ 'slug': req.query.slug })
        .populate('country')
        .populate('driver_1')
        .populate('driver_2')
        .exec()
        .then((team2) => {
            let team = {
                ...team2.toObject(),
                teamLogo: (team2.teamLogo.length > 0) ? team2.teamLogo[0].url : '',
                teamCarImage: (team2.teamCarImage.length > 0) ? team2.teamCarImage[0].url : ''
            };
            team.driver_1.driverImage = (team2.driver_1.driverImage.length > 0) ? team2.driver_1.driverImage[0].url : '';
            team.driver_2.driverImage = (team2.driver_2.driverImage.length > 0) ? team2.driver_2.driverImage[0].url : '';
            let driver_1 = {
                driverImage: team.driver_1.driverImage,
                number: team.driver_1.number,
                firstName: team.driver_1.firstName,
                lastName: team.driver_1.lastName,
                slug: team.driver_1.slug,
                name: team.driver_1.name
            };
            let driver_2 = {
                driverImage: team.driver_2.driverImage,
                number: team.driver_2.number,
                firstName: team.driver_2.firstName,
                lastName: team.driver_2.lastName,
                slug: team.driver_2.slug,
                name: team.driver_2.name
            };
            team.driver_1 = driver_1;
            team.driver_2 = driver_2;

            return res.status(200).send(team);
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
});

router.get('/teams-drivers', (req, res) => {
    Team.find({})
        .select(['id', 'teamColor', 'officialName', 'shortName', 'driver_1', 'driver_2'])
        .populate({ path: 'driver_1', select: 'id firstName lastName' })
        .populate({ path: 'driver_2', select: 'id firstName lastName' })
        .exec((error, teams) => {
            if (error) {
                return res.status(400).send(error);
            } else {
                return res.status(200).send(teams);
            }
        });
});

module.exports = router;