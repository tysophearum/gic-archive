import { gql } from '@apollo/client';

const QUERIES = {
  listThesisCategory: gql`
  {
    listThesisCategory {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
  `,
  listClassProjectCategory: gql`
  {
    listClassProjectCategory {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
  `,
  listApprovedThesis: gql`
  {
    listApprovedThesis {
      data {
        id
        title
        description
        image
        user {
          id
          name
          studentId
        }
        likeAmount
        createdAt
        updatedAt
      }
      pagination {
        totalItems
        currentPage
        pageSize
        totalPages
        hasNextPage
        hasPrevPage
      }
    }
  }
  `,
  listApprovedClassProject: gql`
  query ListApprovedClassProject($pager: PaginationInput) {
    listApprovedClassProject(pager: $pager) {
      data {
        id
        title
        description
        image
        user {
          id
          name
          studentId
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
        liked
        createdAt
        updatedAt
      }
      pagination {
        totalItems
        currentPage
        pageSize
        totalPages
        hasNextPage
        hasPrevPage
      }
    }
  }
  `,
  listApprovedThesisByCategory: gql`
  query ListApprovedThesisByCategory($categoryId: String) {
    listApprovedThesisByCategory(categoryId: $categoryId) {
      data {
        id
        title
        description
        image
        user {
          id
          name
          studentId
          image
        }
        likeAmount
        liked
        createdAt
        updatedAt
      }
      pagination {
        totalItems
        currentPage
        pageSize
        totalPages
        hasNextPage
        hasPrevPage
      }
    }
  }
  `,
  listApprovedClassProjectByCategory: gql`
  query ListApprovedClassProjectByCategory($categoryId: String) {
    listApprovedClassProjectByCategory(categoryId: $categoryId) {
      data {
        id
        title
        description
        image
        user {
          id
          name
          studentId
          image
        }
        likeAmount
        liked
        createdAt
        updatedAt
      }
      pagination {
        totalItems
        currentPage
        pageSize
        totalPages
        hasNextPage
        hasPrevPage
      }
    }
  }
  `,
  getClassProjectById: gql`
  query GetClassProjectById($classProjectId: String!) {
    getClassProjectById(classProjectId: $classProjectId) {
      id
      title
      description
      image
      user {
        id
        name
        studentId
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
        name
        studentId
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
  `,
  listClassProjectComment: gql`
  query ListClassProjectComment($documentId: String!, $pager: PaginationInput) {
    listClassProjectComment(documentId: $documentId, pager: $pager) {
      comment {
        id
        user {
          id
          name
          studentId
          email
          gender
          image
          createdAt
          updatedAt
        }
        comment
        createdAt
        updatedAt
      }
      pagination {
        totalItems
        currentPage
        pageSize
        totalPages
        hasNextPage
        hasPrevPage
      }
    }
  }
  `,
  getThesisById: gql`
  query GetThesisById($thesisId: String!) {
    getThesisById(thesisId: $thesisId) {
      id
      title
      description
      image
      user {
        id
        name
        studentId
        email
        gender
        image
        createdAt
        updatedAt
      }
      teacher {
        id
        name
        studentId
        email
        gender
        image
        createdAt
        updatedAt
      }
      thesisCategory {
        id
        name
        description
        createdAt
        updatedAt
      }
      collaborators {
        id
        name
        studentId
        email
        gender
        image
        createdAt
        updatedAt
      }
      thesisLink
      repositoryLink
      videoLink
      isApproved
      likeAmount
      createdAt
      updatedAt
    }
  }
  `,
  listThesisComment: gql`
  query ListThesisComment($documentId: String!, $pager: PaginationInput) {
    listThesisComment(documentId: $documentId, pager: $pager) {
      comment {
        id
        user {
          id
          name
          studentId
          email
          gender
          image
          createdAt
          updatedAt
        }
        comment
        createdAt
        updatedAt
      }
      pagination {
        totalItems
        currentPage
        pageSize
        totalPages
        hasNextPage
        hasPrevPage
      }
    }
  }
  `,
  listMyApprovedClassProject: gql`
  query ListMyApprovedClassProject {
    listMyApprovedClassProject {
      data {
        id
        title
        description
        image
        user {
          id
          name
          studentId
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
        classProjectLink
        repositoryLink
        videoLink
        isApproved
        likeAmount
        liked
        createdAt
        updatedAt
      }
      pagination {
        totalItems
        currentPage
        pageSize
        totalPages
        hasNextPage
        hasPrevPage
      }
    }
  }
  `,
  listMyApprovedThesis: gql`
  query ListMyApprovedThesis {
    listMyApprovedThesis {
      data {
        id
        title
        description
        image
        user {
          id
          name
          studentId
          email
          gender
          image
          createdAt
          updatedAt
        }
        thesisCategory {
          id
          name
          description
          createdAt
          updatedAt
        }
        thesisLink
        repositoryLink
        videoLink
        isApproved
        likeAmount
        liked
        createdAt
        updatedAt
      }
      pagination {
        totalItems
        currentPage
        pageSize
        totalPages
        hasNextPage
        hasPrevPage
      }
    }
  }
  `,
  createClassProject: gql`
  mutation CreateClassProject($classProject: CreateClassProjectInput!, $image: Upload) {
    createClassProject(classProject: $classProject, image: $image) {
      id
    }
  }
  `,
  createThesis: gql`
  mutation CreateThesis($thesis: CreateThesisInput!, $image: Upload) {
    createThesis(thesis: $thesis, image: $image) {
      id
    }
  }
  `,
  listMyUnapprovedClassProject: gql`
  query ListMyUnapprovedClassProject {
    listMyUnapprovedClassProject {
      data {
        id
        title
        description
        image
        classProjectCategory {
          id
          name
          description
          createdAt
          updatedAt
        }
        classProjectLink
        repositoryLink
        videoLink
        isApproved
        likeAmount
        liked
        createdAt
        updatedAt
      }
      pagination {
        totalItems
        currentPage
        pageSize
        totalPages
        hasNextPage
        hasPrevPage
      }
    }
  }
  `,
  listMyUnapprovedThesis: gql`
  query ListMyUnapprovedThesis {
    listMyUnapprovedThesis {
      data {
        id
        title
        description
        image
        thesisCategory {
          id
          name
          description
          createdAt
          updatedAt
        }
        thesisLink
        repositoryLink
        videoLink
        isApproved
        likeAmount
        liked
        createdAt
        updatedAt
      }
      pagination {
        totalItems
        currentPage
        pageSize
        totalPages
        hasNextPage
        hasPrevPage
      }
    }
  }
  `,
  searchStudents: gql`
  query SearchStudents($name: String!) {
    searchStudents(name: $name) {
      id
      name
      studentId
      email
      gender
      image
      createdAt
      updatedAt
    }
  }
  `,
  searchTeachers: gql`
  query SearchTeachers($name: String!) {
    searchTeachers(name: $name) {
      id
      name
      studentId
      email
      gender
      image
      createdAt
      updatedAt
    }
  }
  `,
  deleteClassProject: gql`
  mutation DeleteClassProject($classProjectId: String!) {
    deleteClassProject(classProjectId: $classProjectId)
  }
  `,
  deleteThesis: gql`
  mutation DeleteThesis($thesisId: String!) {
    deleteThesis(thesisId: $thesisId)
  }
  `,
  createClassProjectComment: gql`
  mutation CreateClassProjectComment($classProjectComment: CreateClassProjectCommentInput!) {
    createClassProjectComment(classProjectComment: $classProjectComment) {
      id
      user {
        id
        name
        studentId
        email
        gender
        image
        createdAt
        updatedAt
      }
      comment
      createdAt
      updatedAt
    }
  }
  `,
  createThesisComment: gql`
  mutation CreateThesisComment($thesisComment: CreateThesisCommentInput!) {
    createThesisComment(thesisComment: $thesisComment) {
      id
      user {
        id
        name
        studentId
        email
        gender
        image
        createdAt
        updatedAt
      }
      comment
      createdAt
      updatedAt
    }
  }
  `
}

export default QUERIES;