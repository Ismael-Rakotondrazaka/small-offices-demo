import { RepositoryProvider } from '~~/server/services';

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id');

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID utilisateur requis',
      });
    }

    const userRole = await RepositoryProvider.userRoleRepository.findOne({
      where: { id },
    });

    if (!userRole) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Utilisateur non trouvé',
      });
    }

    return userRole;
  }
  catch (error) {
    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération de l\'utilisateur',
    });
  }
});
