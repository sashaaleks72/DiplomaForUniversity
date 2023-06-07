import { useEffect, useState } from 'react';
import ITeapot from '../models/ITeapot';
import u_heart from '../images/heart-regular.svg';
import p_heart from '../images/heart-solid.svg';
import x_mark from '../images/xmark-solid.svg';
import unfilled_star from '../images/star-regular.svg';
import filled_star from '../images/star-solid.svg';
import Modal from './UI/ModalWrapper/ModalWrapper';
import { useOutletContext } from 'react-router-dom';
import IComment from '../models/IComment';
import TeapotsService from '../API/TeapotsService';
import { useCommentRate } from '../hooks/useCommentRate';
import cart from '../store/cart';
import { useWishesUpdate } from '../hooks/useWishesUpdate';
import ICommentRequest from '../models/ICommentRequest';
import { IPagination } from '../models/IPagination';
import IPersonInfo from './../models/IPersonInfo';
import AuthService from '../API/AuthService';
import user from '../store/user';

const Comments = (): JSX.Element => {
    const [comments, setComments] = useState<IPagination<IComment> | null>(
        null,
    );
    const [createComment, setCreateComment] = useState<ICommentRequest>({
        userId: '',
        teapotId: '',
        commentText: '',
        rate: 0,
        advantages: '',
        disadvantags: '',
    });

    const [teapot] = useOutletContext<[ITeapot, () => void]>();
    const [isModal, setIsModal] = useState<boolean>(false);

    const [isHeartPressed, setIsHeartPressed] = useWishesUpdate(teapot);
    const [
        rate,
        starsSrcs,
        onStarMouseEnter,
        onStarClick,
        onStarMouseLeave,
        setRate,
    ] = useCommentRate(5);

    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        const init = async () => {
            const recievedComments =
                teapot != null
                    ? await TeapotsService.getCommentsByTeapotId(teapot.id!)
                    : null;

            setComments(recievedComments);
        };

        const getUserId = async () => {
            const id = await user
                .getProfile()
                .then((response) => response.userId);
            setUserId(id);
        };

        init();
        getUserId();
    }, [teapot]);

    const onFormChangeHandler = (e: React.SyntheticEvent) => {
        const formElementData = e.target as typeof e.target & {
            name: string;
            value: string;
        };

        setCreateComment((prev) => {
            return {
                ...prev,
                [formElementData.name]: formElementData.value,
            };
        });
    };

    const addNewComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newComment: ICommentRequest = {
            userId: '',
            teapotId: '',
            commentText: '',
            rate: 0,
            advantages: '',
            disadvantags: '',
        };

        const formData = e.target as typeof e.target & {
            commentText: { value: string };
            advantages: { value: string };
            disadvantags: { value: string };
        };

        if (teapot) {
            newComment.commentText = createComment.commentText;
            newComment.advantages = createComment.advantages;
            newComment.disadvantags = createComment.disadvantags;
            newComment.rate = rate;
            newComment.teapotId = teapot.id!;
            newComment.userId = userId;

            await TeapotsService.postUserComment(newComment);

            // setComments([...comments, newComment]);
            setIsModal(false);
            setCreateComment({
                userId: '',
                teapotId: '',
                commentText: '',
                rate: 0,
                advantages: '',
                disadvantags: '',
            });
            setRate(0);
        }
    };

    return (
        <div className="ms-2 mt-2 position-relative d-flex justify-content-between">
            <div className="w-50">
                <div className="border border-grey rounded-1 d-flex align-items-center justify-content-between p-3">
                    <div>Write a comment about the good</div>
                    <div
                        className="btn btn-success"
                        onClick={() => setIsModal(true)}
                    >
                        Write a comment
                    </div>
                </div>
                <div className="mt-2">
                    {comments?.data.map((comment, index) => {
                        return (
                            <div key={index} className="mb-3">
                                <div className="fw-bold fs-5">
                                    {comment.userFullName}
                                </div>
                                <div>
                                    {Array.from(Array(5).keys()).map(
                                        (el, index) => (
                                            <img
                                                key={index}
                                                src={
                                                    index < comment.rate
                                                        ? filled_star
                                                        : unfilled_star
                                                }
                                                height={25}
                                            />
                                        ),
                                    )}
                                </div>
                                <div>{comment.commentText}</div>
                                <div className="fw-bold">Advantages: </div>
                                <div>{comment.advantages}</div>
                                <div className="fw-bold">Disadvantages: </div>
                                <div>{comment.disadvantags}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="max-w-50 align-self-start position-sticky top-0 pt-2">
                <div className="border border-grey rounded-1">
                    <div className="d-flex">
                        <img
                            className="p-2"
                            src={teapot?.imgName}
                            height={150}
                        />
                        <div className="p-2">
                            <div>{teapot?.name}</div>
                            <div className="d-flex align-items-center">
                                <div
                                    className="btn btn-info text-white mt-2"
                                    onClick={() => cart.addToCart(teapot!)}
                                >
                                    Add to cart
                                </div>
                                <div
                                    className="btn border border-white"
                                    onClick={() =>
                                        setIsHeartPressed((prev) => !prev)
                                    }
                                >
                                    {isHeartPressed ? (
                                        <img src={p_heart} height={20} />
                                    ) : (
                                        <img src={u_heart} height={20} />
                                    )}
                                </div>
                            </div>
                            <div className="fs-5">{teapot?.price} UAH</div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isVisible={isModal} setIsVisible={setIsModal}>
                <div className="position-relative">
                    <img
                        style={{ cursor: 'pointer' }}
                        className="pointer position-absolute end-0"
                        onClick={() => setIsModal(false)}
                        src={x_mark}
                        height={20}
                    />
                    <h2 className="fs-4 fw-light">
                        Write comment about the product:{' '}
                    </h2>
                    <form onSubmit={(e) => addNewComment(e)}>
                        <div>
                            {starsSrcs.map((el, index) => (
                                <img
                                    key={index}
                                    src={starsSrcs[index]}
                                    height={25}
                                    onMouseEnter={() => onStarMouseEnter(index)}
                                    onMouseLeave={() => onStarMouseLeave()}
                                    onClick={() => {
                                        onStarClick(index);
                                    }}
                                />
                            ))}
                        </div>
                        <textarea
                            value={createComment.commentText}
                            onChange={onFormChangeHandler}
                            name="commentText"
                            className="form-control mt-2"
                            placeholder="Leave a comment here"
                            id="floatingTextarea2"
                            style={{ height: '100px' }}
                        />
                        <div className="mt-1">
                            <span className="fw-light fs-5">Advantages:</span>
                            <input
                                value={createComment.advantages}
                                onChange={onFormChangeHandler}
                                name="advantages"
                                type="text"
                                className="form-control"
                                placeholder="Write advantages"
                            />
                        </div>
                        <div className="mt-1">
                            <span className="fw-light fs-5">
                                Disadvantages:{' '}
                            </span>
                            <input
                                value={createComment.disadvantags}
                                onChange={onFormChangeHandler}
                                name="disadvantags"
                                type="text"
                                className="form-control"
                                placeholder="Write disadvantages"
                            ></input>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button
                                type="submit"
                                className="btn btn-success mt-3"
                            >
                                Save the comment
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default Comments;
