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
          firstName
          lastName
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
  {
    listApprovedClassProject {
      data {
        id
        title
        description
        image
        user {
          id
          firstName
          lastName
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
          firstName
          lastName
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
          firstName
          lastName
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
  `,
  listClassProjectComment: gql`
  query ListClassProjectComment($documentId: String!, $pager: PaginationInput) {
    listClassProjectComment(documentId: $documentId, pager: $pager) {
      comment {
        id
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
        firstName
        lastName
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
        firstName
        lastName
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
          firstName
          lastName
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
          firstName
          lastName
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
}

export default QUERIES;