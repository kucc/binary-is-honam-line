import React, { useCallback, useRef } from 'react';
import { Form, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';
import { backUrl } from '../config/config';

const PostForm = () => {
    const { imagePaths } = useSelector((state) => state.post);
    const dispatch = useDispatch();

    const onSubmit = useCallback(() => {
        const formData = new FormData();
        imagePaths.forEach((p) => {
            // req.body.faceimage
            formData.append('faceimage', p);
        });
    }, [imagePaths]);
    
    const imageInput = useRef();
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const onChangeImages = useCallback((e) => {
        console.log('images', e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            // 여기의 'image'는 POST /post/images의 key값과 같아야한다.
            imageFormData.append('image', f);
        });
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        });
    }, []);

    // 고차함수 이용
    const onRemoveImage = useCallback((index) => () => {
        dispatch({
            type: REMOVE_IMAGE,
            data: index,
        });
    });
    return (
        <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
            <div>
                <input 
                type="file" 
                name="image" 
                multiple 
                hidden 
                ref={imageInput} 
                onChange={onChangeImages}
                />
                <Button style={{ marginTop: '10px' }} onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type="danger" style={{ marginTop: '10px', float: 'right' }} htmlType="submit">올리기</Button>
            </div>
            <div>
                {imagePaths.map((v, i) => (
                    <div key={v} style={{ display: 'inline-block' }}>
                        <img src={`${backUrl}/${v}`} style={{ width: '200px' }} alt={v} />
                        <div>
                            <Button onClick={onRemoveImage(i)}>제거</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    );
};

export default PostForm;
