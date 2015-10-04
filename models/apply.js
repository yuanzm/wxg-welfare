
/* @author: zimyuan
 * @last-edit-date: 2015-09-13
 */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	BaseModel = require('./base_model');

var ApplySchema= new Schema({
	count : {type: Number, default: 0},						//
         
    createer_name: {type: String},
    game: {type: String},
    start_time: {type: Date, default: Date.now},
    end_time: {type: String, default: Date.now},
    limit: {typeL: String},    

    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
});

ApplySchema.plugin(BaseModel);
ApplySchema.index({game: 1}, {unique: true});

mongoose.model('Apply', ApplySchema);
