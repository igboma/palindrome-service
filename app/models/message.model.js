const Datastore = require('@seald-io/nedb');
const { isTextPalindrome } = require('../helper/utils');
const fs = require('fs');
const path = require('path');

let db;
if (process.env.DB_DIR) {
	const dbDir = process.env.DB_DIR || path.join(__dirname, 'data');
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
    }
    const dbPath = path.join(dbDir, 'messages.db');
    db = new Datastore({ filename: dbPath, autoload: true }); // File-based datastore
} else {
	db = new Datastore(); // In-memory datastore for unit tests
}


class Message {
	constructor() {
		db.ensureIndex({ fieldName: 'text', unique: true }, function (err) {
			if (err)
				console.log(err);
		});
	}

	find(query = {}, projection = {}, options = {}, callback) {
		let cursor = db.find(query, projection);
		if (options.sort) {
			cursor = cursor.sort(options.sort);
		}
		if (options.skip) {
			cursor = cursor.skip(options.skip);
		}
		if (options.limit) {
			cursor = cursor.limit(options.limit);
		}
		cursor.exec(callback);
	}

	findById(id, projection = {}, callback) {
		db.findOne({ _id: id }, projection, callback);
	}

	findByIdWithoutProj(id, callback) {
		db.findOne({ _id: id }, callback);
	}

	save(id, update, callback) {
		db.update({ _id: id }, update, {}, callback);
	}

	remove(id, callback) {
		db.remove({ _id: id }, {}, callback);
	}

	insert(data, callback) {
		data.isPalindrome = isTextPalindrome(data.text);
		data.dateAdded = new Date();
		db.insert(data, callback);
	}

	findByIdAndUpdate(id, update, options, callback) {
		update.isPalindrome = isTextPalindrome(update.text);
		if (options.new) {
			db.update({ _id: id }, { $set: update }, {}, (err, numReplaced) => {
				if (err) {
					return callback(err);
				};
				if (numReplaced === 0) {
					callback(null, numReplaced);
				}
				else {
					db.findOne({ _id: id }, {}, callback);
				}
			});
		} else {
			db.update({ _id: id }, { $set: update }, {}, callback);
		}
	}
}

module.exports = Message;