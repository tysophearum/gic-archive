import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from "graphql-tag";

const CREATE_CLASSPROJECT = gql`
mutation CreateClassProject($classProject: CreateClassProjectInput!, $file: [Upload!], $image: Upload) {
  createClassProject(classProject: $classProject, file: $file, image: $image) {
    id
    title
    description
    image
    user {
      id
      firstName
      lastName
      email
      gender
      image
      createdAt
      updatedAt
    }
    classProjectCategory {
      id
      name
      description
      createdAt
      updatedAt
    }
    collaborators {
      id
      firstName
      lastName
      email
      gender
      image
      createdAt
      updatedAt
    }
    classProjectLink
    repositoryLink
    videoLink
    isApproved
    likeAmount
    createdAt
    updatedAt
  }
}
`

const Test = () => {
  const [classProject, setClassProject] = useState({
    title: '',
    description: '',
    classProjectCategoryId: '', // Assuming category selection
    classProjectLink: '',
    repositoryLink: '',
    videoLink: '',
  });
  const [image, setImage] = useState(null);
  const [files, setFiles] = useState([]);

  const [createClassProject, { loading, error }] = useMutation(CREATE_CLASSPROJECT, {
    onCompleted: (data) => {
      console.log('Project created:', data.createClassProject);
      // Handle successful creation (e.g., clear form, show success message)
    },
    onError: (err) => console.log(err),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClassProject({ ...classProject, [name]: value });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('variables', JSON.stringify({ classProject }));
    formData.append('operations', JSON.stringify({ query: 'CREATE_CLASSPROJECT' }));
    if (image) {
      formData.append('image', image);
    }
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
      }
    }

    try {
      await createClassProject({ variables: formData });
    } catch (err) {
      console.error(err);
      // Handle form submission errors (e.g., display error messages)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" name="title" value={classProject.title} onChange={handleChange} required />

      <label htmlFor="description">Description:</label>
      <textarea id="description" name="description" value={classProject.description} onChange={handleChange} required />

      {/* Assuming you have a way to select a category ID */}
      <label htmlFor="classProjectCategoryId">Category:</label>
      <select id="classProjectCategoryId" name="classProjectCategoryId" value={classProject.classProjectCategoryId} onChange={handleChange} required>
        <option value="661783989690affbb5459d3a">661783989690affbb5459d3a</option>
      </select>

      <label htmlFor="image">Image (optional):</label>
      <input type="file" id="image" name="image" onChange={handleImageChange} />

      <label htmlFor="files">Files (optional):</label>
      <input type="file" id="files" name="files" multiple onChange={handleFileChange} />

      <label htmlFor="classProjectLink">Project Link (optional):</label>
      <input type="text" id="classProjectLink" name="classProjectLink" value={classProject.classProjectLink} onChange={handleChange} />

      <label htmlFor="repositoryLink">Repository Link (optional):</label>
      <input type="text" id="repositoryLink" name="repositoryLink" value={classProject.repositoryLink} onChange={handleChange} />

      <label htmlFor="videoLink">Video Link (optional):</label>
      <input type="text" id="videoLink" name="videoLink" value={classProject.videoLink} onChange={handleChange} />

      <button type="submit" disabled={loading}>
        {loading ? 'Creating Project...' : 'Create Class Project'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </form>
  );
};

export default Test;
