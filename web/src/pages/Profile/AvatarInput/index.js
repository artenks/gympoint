import React, { useState, useRef, useEffect } from 'react';
import { MdCameraAlt } from 'react-icons/md';
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';

import { useField } from '@rocketseat/unform';

import api from '~/services/api';
import { formatInitials } from '~/util/format';

import { Container } from './styles';

export default function AvatarInput() {
  const { defaultValue, registerField } = useField('avatar');
  const { name } = useSelector(state => state.user.profile);

  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref]); // eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);

    setIsLoading(true);

    const response = await api.post('/avatars', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
    setIsLoading(false);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        {preview ? (
          <img src={preview} alt="Avatar" />
        ) : (
          <div className="name">{formatInitials(name)}</div>
        )}

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
      <div className="camera-icon">
        {isLoading ? (
          <ReactLoading type="spin" color="#fff" height={24} width={24} />
        ) : (
          <MdCameraAlt size={24} color="#fff" />
        )}
      </div>
    </Container>
  );
}

// TODO: change default image