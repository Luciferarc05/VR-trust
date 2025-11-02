    const mongoose = require('mongoose');
    const workshopSchema = new mongoose.Schema({
        title: { type: String, required: true },
        description: { type: String, required: true },
        date: { type: Date, required: true },
        time: { type: String, required: true },
        locationOrUrl: { type: String, required: true }, // Can be a zoom link or physical address
        presenter: { type: String },
        imageUrl: { type: String },
        registrationLink: { type: String },
        isUpcoming: { type: Boolean, default: true },
        createdAt: { type: Date, default: Date.now },
    });
    
    // This small bit of code automatically checks if the workshop date is in the past
    workshopSchema.pre('save', function(next) {
      if (this.date < new Date()) {
        this.isUpcoming = false;
      }
      next();
    });
    
    module.exports = mongoose.model('Workshop', workshopSchema);
    

