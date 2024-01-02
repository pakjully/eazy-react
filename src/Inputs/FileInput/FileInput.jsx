import React, { useEffect } from 'react';
import './FileInput.scss';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { CloseButton, Row } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';

export function FileInput(props) {
  const convertFileType = (fileTypes) => {
    const result = fileTypes.reduce((accumulator, fileType) => {
      accumulator[fileType] = [];
      return accumulator;
    }, {});
    return result;
  };

  const {
    onChange, handleClick, name, files, heading, text, description, className, link, linkName, acceptedTypes,
  } = props;
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone(acceptedTypes ? {
    accept: convertFileType(acceptedTypes),
  } : undefined);

  useEffect(() => {
    onChange(name, acceptedFiles);
  }, [name, acceptedFiles, onChange]);
  return (
    <div className={className}>
      <Form.Group as={Row} className="mb-3">
        <p className="file-input-heading">{heading}</p>
        <Form.Label column sm={12} md={5}>
          {text}
          <p className="label">{description}</p>
        </Form.Label>
        <Col sm={12} md={7}>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <div className="file-content">
              <img className="icon" alt="upload icon" src="/images/upload-solid.svg" />
              <p className="file-input-text">
                Кликните, чтобы выбрать файлы для загрузки
                или просто перетащите их внутрь отмеченной зоны
              </p>
            </div>
          </div>
          {files.map((item, i) => (
            <div key={`${item.name}-${i}`} className="file-download">
              <p className="file-name">
                {item.name}
                <CloseButton
                  className="delete-tag"
                  variant="white"
                  size="small"
                  onClick={() => handleClick(name, item)}
                />
              </p>
            </div>
          ))}
          <a className="instruction-link" target="_blank" href={link} rel="noreferrer">{linkName}</a>
        </Col>
      </Form.Group>
    </div>

  );
}
