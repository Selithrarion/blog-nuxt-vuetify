const Post = require('../models/post.model');

// get

module.exports.getAll = async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (e) {
		res.status(500).json(e);
	}
};
module.exports.getById = async (req, res) => {
	try {
		await Post.findById(req.params.id)
			.populate('comments')
			.exec((error, post) => {
				res.json(post);
			});
	} catch (e) {
		res.status(500).json(e);
	}
};
module.exports.getAnalytics = async (req, res) => {
	try {
		const posts = await Post.find();

		const labels = posts.map((post) => post.name);
		const json = {
			comments: {
				labels,
				data: posts.map((post) => post.comments.length),
			},
			views: {
				labels,
				data: posts.map((post) => post.views),
			},
		};

		res.json(json);
	} catch (e) {
		res.status(500).json(e);
	}
};

// post

module.exports.create = async (req, res) => {
	const post = new Post({
		name: req.body.name,
		text: req.body.text,
		imageUrl: `/${req.file.filename}`,
	});

	try {
		await post.save();
		res.status(201).json(post);
	} catch (e) {
		res.status(500).json(e);
	}
};
module.exports.addView = async (req, res) => {
	const $set = {
		views: ++req.body.views,
	};
	try {
		await Post.findOneAndUpdate({ _id: req.params.id }, { $set });
		res.status(204).json();
	} catch (e) {
		res.status(500).json(e);
	}
};

// put

module.exports.update = async (req, res) => {
	const $set = {
		name: req.body.name,
		text: req.body.text,
	};
	try {
		const post = await Post.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			{ $set },
			{ new: true }
		);
		res.json(post);
	} catch (e) {
		res.status(500).json(e);
	}
};

// delete

module.exports.remove = async (req, res) => {
	try {
		await Post.deleteOne({ _id: req.params.id });
		res.json({ message: 'Пост удален' });
	} catch (e) {
		res.status(500).json(e);
	}
};
