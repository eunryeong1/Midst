import ReplyRepository from "repositories/reply.repository";

class ReplyService {
    public createReply = async (
        postId: string,
        replyData: { name: string; description: string }
    ) => {
        const createReplyData = await ReplyRepository.createReply(
            postId,
            replyData
        );
        return createReplyData;
    };

    public getReplies = async (postId: string) => {
        const findAllRepliesData = await ReplyRepository.findAllReplies(postId);
        return findAllRepliesData;
    };

    public getReplyById = async (id: string) => {
        const findOneReplyData = await ReplyRepository.findOneReply(id);
        return findOneReplyData;
    };

    public updateReply = async (
        id: string,
        replyData: { description: string }
    ) => {
        const updateReplyData = await ReplyRepository.updateReply(
            id,
            replyData
        );
        return updateReplyData;
    };

    public deleteReply = async (id: string) => {
        const deleteReplyData = await ReplyRepository.deleteReply(id);
        return deleteReplyData;
    };
}

export default new ReplyService();
