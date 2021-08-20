import React from 'react';
import { useSelector } from 'react-redux';

import PostForm from '../components/PostForm';
import AppLayout from '../components/AppLayout';
// import { LOAD_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
//   const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

//   useEffect(() => {
//     dispatch({
//       type: LOAD_USER_REQUEST,
//     });
//     dispatch({
//       type: LOAD_POSTS_REQUEST,
//     });
//   }, []);

//   useEffect(() => {
//     function onScroll() {
//       if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
//         if (hasMorePosts && !loadPostsLoading) {
//           const lastId = mainPosts[mainPosts.length - 1]?.id;
//           dispatch({
//             type: LOAD_POSTS_REQUEST,
//             lastId, 
//           });
//         }
//       }
//     }
//     window.addEventListener('scroll', onScroll);
//     return () => {
//       window.removeEventListener('scroll', onScroll);
//     };
//   }, [mainPosts, hasMorePosts, loadPostsLoading]);

  return (
    <AppLayout>
        <PostForm />
        {/* {me && <PostForm />} */}
    </AppLayout>
  );
};

// // 서버사이드 랜더링
// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
//   const cookie = context.req ? context.req.headers.cookie : '';
//   axios.defaults.headers.Cookie = '';
//   if (context.req && cookie) {
//     axios.defaults.headers.Cookie = cookie;
//   }
//   context.store.dispatch({
//     type: LOAD_MY_INFO_REQUEST,
//   });
//   context.store.dispatch(END);
//   await context.store.sagaTask.toPromise();
// });

export default Home;
