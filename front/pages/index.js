import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';

// eslint-disable-next-line arrow-body-style
const Home = () => {
    // const { isLoggedIn } = useSelector((state) => state.user);
    // const { mainPosts } = useSelector((state) => state.use);
    return (
        <>
            <AppLayout>
                {/* {isLoggedIn && <PostForm />}
                {mainPosts.map((post) => <PostCard key={post.id} post={post} />)} */}
            </AppLayout>
        </>
    );
};

// 서버사이드 랜더링
// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
//   const cookie = context.req ? context.req.headers.cookie : '';
//   axios.defaults.headers.Cookie = '';
//   if (context.req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }
//   context.store.dispatch({
//     type: LOAD_MY_INFO_REQUEST,
//   });
//   context.store.dispatch({
//     type: LOAD_POSTS_REQUEST,
//   });
//   context.store.dispatch(END);
//   await context.store.sagaTask.toPromise();
// });

export default Home;
