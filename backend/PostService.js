import Post from './post.js';
import FileService from './fileService.js';

class PostService {
    async create(post, picture) {
        let fileName = null;
        if (picture) {
            fileName = FileService.saveFile(picture);
        }
        const createdPost = await Post.create({ ...post, picture: fileName });
        return createdPost;
    }

    async getAll() {
        const posts = await Post.findAll();
        return posts;
    }

    async getOne(id) {
        if (!id) {
            throw new Error('Id is not specified');
        }
        const post = await Post.findByPk(id);
        return post;
    }

    async update(id, post, picture) {
        if (!id) {
            throw new Error('Id is not specified');
        }

        let fileName = post.picture;
        if (picture) {
            fileName = FileService.saveFile(picture);
        }

        const updatedPost = await Post.update({ ...post, picture: fileName }, { where: { id } });
        return updatedPost;
    }

    async delete(id) {
        if (!id) {
            throw new Error('Id is not specified');
        }
        const post = await Post.destroy({ where: { id } });
        return post;
    }
}

export default new PostService();