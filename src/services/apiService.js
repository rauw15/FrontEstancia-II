// Obtenemos la URL base de la API desde las variables de entorno de Vite
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Una función de utilidad para obtener el token del localStorage
const getToken = () => localStorage.getItem('token');


// --- MODIFICACIÓN 1: apiFetch ahora acepta un token opcional inmediato ---
const apiFetch = async (endpoint, options = {}, immediateToken = null) => {
  const url = `${BASE_URL}${endpoint}`;
  
  // Si nos pasan un token, lo usamos. Si no, lo buscamos en localStorage.
  const token = immediateToken || getToken(); 
  
  let refreshToken = localStorage.getItem('refreshToken');

  const defaultHeaders = {
    ...(token && { 'x-access-token': token }), 
  };
  
  if (!(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    let response = await fetch(url, config);
    if (response.status === 401 && refreshToken) {
      // Intentar refrescar el token
      const refreshResponse = await fetch(`${BASE_URL}/auth/refreshtoken`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        localStorage.setItem('token', refreshData.accessToken);
        // Actualiza el token en la configuración de la petición que falló
        config.headers['x-access-token'] = refreshData.accessToken;
        // Reintenta la petición original con el nuevo token
        response = await fetch(url, config);
      } else {
        logout(); // Si el refresh token falla, es una sesión inválida.
        throw new Error('Sesión expirada. Por favor, inicia sesión de nuevo.');
      }
    }
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        logout();
      }
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.message || 'Ocurrió un error en la petición');
    }
    if (response.status === 204) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`API Fetch Error (${endpoint}):`, error);
    // No redirigir aquí, solo propagar el error para que el componente decida qué hacer.
    if (error.message.includes("Sesión expirada")) {
      logout();
    }
    throw error;
  }
};

// Una función para cerrar sesión y limpiar tokens
export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = '/login';
};


// --- AUTH ENDPOINTS ---

export const login = (credentials) => {
  // MODIFICADO: Ahora solo hace la petición y devuelve el resultado.
  return apiFetch('/auth/signin', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

export const register = (userData) => {
  return apiFetch('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const refreshToken = (tokenData) => {
  return apiFetch('/auth/refreshtoken', {
      method: 'POST',
      body: JSON.stringify(tokenData)
  })
}

// --- USER ENDPOINTS ---
export const getAllUsers = () => {
    return apiFetch('/users');
};
export const getUserById = (id) => {
    return apiFetch(`/users/${id}`);
};
export const updateUser = (id, userData) => {
    return apiFetch(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData)
    });
};
export const deleteUser = (id) => {
    return apiFetch(`/users/${id}`, {
        method: 'DELETE'
    });
};
export const getUserBoard = () => {
    return apiFetch('/users/userboard');
};
export const getModeratorBoard = () => {
    return apiFetch('/users/modboard');
};
export const getAdminBoard = () => {
    return apiFetch('/users/adminboard');
};

// --- ROLE ENDPOINTS ---
export const createRole = (roleData) => {
  return apiFetch('/roles', {
      method: 'POST',
      body: JSON.stringify(roleData)
  });
};
export const getAllRoles = () => {
  return apiFetch('/roles');
};
export const getRoleById = (id) => {
  return apiFetch(`/roles/${id}`);
};
export const updateRole = (id, roleData) => {
  return apiFetch(`/roles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(roleData)
  });
};
export const deleteRole = (id) => {
  return apiFetch(`/roles/${id}`, {
      method: 'DELETE'
  });
};
export const assignRoleToUser = (data) => {
  return apiFetch('/users/assign-role', {
      method: 'POST',
      body: JSON.stringify(data)
  });
};
export const removeRoleFromUser = (userId, roleId) => {
  return apiFetch(`/users/${userId}/roles/${roleId}`, {
      method: 'DELETE'
  });
};
export const getUserRoles = (userId, token) => {
  return apiFetch(`/users/${userId}/roles`, {}, token); 
};

// --- PROJECT ENDPOINTS ---
export const getAllProjects = () => {
  return apiFetch('/projects'); 
};
export const createProject = (projectData) => {
  return apiFetch('/projects', {
    method: 'POST',
    body: projectData, 
  });
};
export const getProjectById = (id) => {
  return apiFetch(`/projects/${id}`);
};
export const getProjectsByUserId = (userId) => {
  return apiFetch(`/projects/user/${userId}`);
};
export const updateProject = (id, projectData) => {
  return apiFetch(`/projects/${id}`, {
    method: 'PUT',
    body: projectData,
  });
};
export const deleteProject = (id) => {
    return apiFetch(`/projects/${id}`, {
        method: 'DELETE'
    });
};
export const downloadProjectFile = (projectId, fileType) => {
    return apiFetch(`/projects/${projectId}/download/${fileType}`);
};

// Función específica para descargar archivos de proyectos
export const downloadFile = async (url, fileName) => {
  try {
    const token = getToken();
    const response = await fetch(url, {
      headers: {
        'x-access-token': token,
      },
    });

    if (!response.ok) {
      throw new Error('Error al descargar el archivo');
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};

// --- CALIFICACIONES ENDPOINTS ---
export const createCalificacion = (data) => {
    return apiFetch('/calificaciones', {
        method: 'POST',
        body: JSON.stringify(data)
    });
};
export const getAllCalificaciones = () => {
    return apiFetch('/calificaciones');
};
export const getCalificacionesByProyectoId = (proyectoId) => {
    return apiFetch(`/calificaciones/proyecto/${proyectoId}`);
};
export const getCalificacionesByEvaluadorId = (evaluadorId) => {
    return apiFetch(`/calificaciones/evaluador/${evaluadorId}`);
};
export const getMyCalificaciones = () => {
    return apiFetch('/calificaciones/evaluador/my');
};
export const updateCalificacion = (id, data) => {
    return apiFetch(`/calificaciones/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
};
export const deleteCalificacion = (id) => {
    return apiFetch(`/calificaciones/${id}`, {
        method: 'DELETE'
    });
};

// --- EXCEL ENDPOINTS ---
export const exportDatabaseToExcel = () => {
    return apiFetch('/excel/export/database');
};
export const importDatabaseFromExcel = (formData) => {
    return apiFetch('/excel/import/database', {
        method: 'POST',
        body: formData
    });
};
