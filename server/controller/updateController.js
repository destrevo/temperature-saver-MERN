const Data = require("../models/data");

const updateData = async (req, res, next) => {
    const body = req.body;
      try {
        const updated = await Data.findOneAndUpdate({ createdby: req.auth.result._id }, {
          $set: {
            data: body.data,
          },
        });
        res.status(200).json(updated);
        return next;
      } catch (err) {
        res.status(500).json(err);
        return next;
      }
     
}
exports.updateData = updateData;