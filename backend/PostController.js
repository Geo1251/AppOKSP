import PostService from './PostService.js';

class PostController {
    async create(req, res) {
        try {
            const post = await PostService.create(req.body, req.files ? req.files.picture : null);
            res.status(200).json(post);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req, res) {
        try {
            const posts = await PostService.getAll();
            return res.json(posts);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOne(req, res) {
        try {
            const post = await PostService.getOne(req.params.id);
            return res.json(post);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async update(req, res) {
        try {
            const updatedPost = await PostService.update(req.params.id, req.body, req.files ? req.files.picture : null);
            return res.json(updatedPost);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async delete(req, res) {
        try {
            const post = await PostService.delete(req.params.id);
            return res.json(post);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}

export default new PostController();