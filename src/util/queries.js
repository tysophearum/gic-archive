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
  query ListApprovedThesis($pager: PaginationInput) {
    listApprovedThesis(pager: $pager) {
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
  listUnapprovedThesis: gql`
  query ListUnapprovedThesis($pager: PaginationInput) {
    listUnapprovedThesis(pager: $pager) {
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
  query ListApprovedClassProjectByCategory($pager: PaginationInput, $categoryId: String) {
    listApprovedClassProjectByCategory(pager: $pager, categoryId: $categoryId) {
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
  listUnapprovedClassProjectByCategory: gql`
  query ListUnapprovedClassProjectByCategory($categoryId: String, $pager: PaginationInput) {
    listUnapprovedClassProjectByCategory(categoryId: $categoryId, pager: $pager) {
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
        classProjectCategory {
          id
          name
          description
          createdAt
          updatedAt
        }
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
  `,
  likeClassProject: gql`
  mutation LikeClassProject($classProjectId: String!) {
    likeClassProject(classProjectId: $classProjectId)
  }
  `,
  likeThesis: gql`
  mutation LikeThesis($thesisId: String!) {
    likeThesis(thesisId: $thesisId)
  }
  `,
  getMe: gql`
  query GetMe {
    getMe {
      id
      name
      studentId
      bio
      email
      gender
      contacts {
        type
        value
      }
      classProjectCategory {
        id
        name
        description
        createdAt
        updatedAt
      }
      image
      coverImage
      role
      tags
      createdAt
      updatedAt
    }
  }`,
  getMyContribution: gql`
  query GetMyContribution {
    getMyContribution {
      classProjectCount
      thesisCount
    }
  }
  `,
  updateMyProfile: gql`
  mutation UpdateMyProfile($user: UpdateUserInput!) {
    updateMyProfile(user: $user) {
      id
      name
      studentId
      bio
      email
      gender
      contacts {
        type
        value
      }
      image
      coverImage
      role
      classProjectCategory {
        id
        name
        description
        createdAt
        updatedAt
      }
      tags
    }
  }
  `,
  listFeaturedClassProject: gql`
  query ListFeaturedClassProject {
    listFeaturedClassProject {
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
  }
  `,
  listFeaturedThesis: gql`
  query ListFeaturedThesis {
    listFeaturedThesis {
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
  }
  `,
  getUserById: gql`
  query GetUserById($userId: String!) {
    getUserById(userId: $userId) {
      id
      name
      studentId
      bio
      email
      gender
      contacts {
        type
        value
      }
      image
      coverImage
      role
      createdAt
      updatedAt
      tags
    }
  }
  `,
  getUserContribution: gql`
  query GetUserContribution($userId: String!) {
    getUserContribution(userId: $userId) {
      classProjectCount
      thesisCount
    }
  }
  `,
  listClassProjectByUser: gql`
  query ListClassProjectByUser($userId: String!) {
    listClassProjectByUser(userId: $userId) {
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
  listThesisByUser: gql`
  query ListThesisByUser($userId: String!) {
    listThesisByUser(userId: $userId) {
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
  logIn: gql`
  mutation LogIn($password: String!, $email: String!) {
    logIn(password: $password, email: $email) {
      token
    }
  }
  `,
  getClassProjectCategoryById: gql`
  query GetClassProjectCategoryById($categoryId: String!) {
    getClassProjectCategoryById(categoryId: $categoryId) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
  `,
  updateClassProjectApproval: gql`
  mutation UpdateClassProjectApproval($approval: Boolean!, $classProjectId: String!) {
    updateClassProjectApproval(approval: $approval, classProjectId: $classProjectId) {
      id
    }
  }
  `,
  updateThesisApproval: gql`
  mutation UpdateThesisApproval($approval: Boolean!, $thesisId: String!) {
    updateThesisApproval(approval: $approval, thesisId: $thesisId) {
      id
    }
  }
  `,
  addFeaturedClassProject: gql`
  mutation AddFeaturedClassProject($classProjectId: String!) {
    addFeaturedClassProject(classProjectId: $classProjectId) {
      id
      createdAt
      updatedAt
      classProject
    }
  }
  `,
  addFeaturedThesis: gql`
  mutation AddFeaturedThesis($thesisId: String!) {
    addFeaturedThesis(thesisId: $thesisId) {
      id
      createdAt
      updatedAt
      thesis
    }
  }
  `,
  removeFeaturedClassProject: gql`
  mutation RemoveFeaturedClassProject($classProjectId: String!) {
    removeFeaturedClassProject(classProjectId: $classProjectId)
  }
  `,
  removeFeaturedThesis: gql`
  mutation RemoveFeaturedThesis($thesisId: String!) {
    removeFeaturedThesis(thesisId: $thesisId)
  }
  `,
  listUnapprovedThesisByTeacherId: gql`
  query ListUnapprovedThesisByTeacherId($pager: PaginationInput) {
    listUnapprovedThesisByTeacherId(pager: $pager) {
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
  listApprovedThesisByTeacherId: gql`
  query ListApprovedThesisByTeacherId($pager: PaginationInput) {
    listApprovedThesisByTeacherId(pager: $pager) {
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
  listClassProjectFeedback: gql`
  query ListClassProjectFeedback($documentId: String!, $pager: PaginationInput) {
    listClassProjectFeedback(documentId: $documentId, pager: $pager) {
      feedbacks {
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
        feedback
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
  createClassProjectFeedback: gql`
  mutation CreateClassProjectFeedback($classProjectFeedback: CreateClassProjectFeedbackInput!) {
    createClassProjectFeedback(classProjectFeedback: $classProjectFeedback) {
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
      feedback
      createdAt
      updatedAt
    }
  }
  `,
  listThesisFeedback: gql`
  query ListThesisFeedback($documentId: String!, $pager: PaginationInput) {
    listThesisFeedback(documentId: $documentId, pager: $pager) {
      feedbacks {
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
        feedback
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
  createThesisFeedback: gql`
  mutation CreateThesisFeedback($thesisFeedback: CreateThesisFeedbackInput!) {
    createThesisFeedback(thesisFeedback: $thesisFeedback) {
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
      feedback
      createdAt
      updatedAt
    }
  }
  `
}

export default QUERIES;