const { Datastore } = require("@google-cloud/datastore");

const credentials = require("../config/serviceAccountKey.json");
const datastore = new Datastore({ projectId: "tkp-studios", credentials });

const buildConfig = (namespace, kind, id) => {
  const path = [kind];

  if (id) {
    path.push(id);
  }

  const entityKey = datastore.key({
    path,
    namespace,
  });

  return entityKey;
};

const createEntity = async (namespace, kind, data) => {
  const key = buildConfig(namespace, kind);

  data.z_creation_date = new Date();

  const entity = {
    key,
    data,
  };

  const response = await datastore.save(entity);
  return response;
};

const getEntityById = async (namespace, kind, id) => {
  const key = buildConfig(namespace, kind, id);

  const response = await datastore.get(key);
  return response;
};

const getAllEntities = async (namespace, kind) => {
  const query = datastore.createQuery(namespace, kind);

  const [entities] = await datastore.runQuery(query);
  return entities;
};

const updateEntity = async (namespace, kind, id, data) => {
  const key = buildConfig(namespace, kind, id);

  const entity = {
    key,
    data,
  };

  data.z_update_date = new Date();

  const response = await datastore.update(entity);
  return response;
};

const deleteEntity = async (namespace, kind, id) => {
  const key = buildConfig(namespace, kind, id);

  const response = await datastore.delete(key);
  return response;
};

const getEntitiesWithFilter = async (namespace, kind, filterProperty, filterValue) => {
  const query = datastore.createQuery(namespace, kind).filter(filterProperty, "=", filterValue);

  const [entities] = await datastore.runQuery(query);

  const entitiesWithId = entities.map(entity => {
    entity.id = parseInt(entity[datastore.KEY].id);
    return entity;
  });

  return entitiesWithId;
};

module.exports.createEntity = createEntity;
module.exports.getEntityById = getEntityById;
module.exports.getAllEntities = getAllEntities;
module.exports.updateEntity = updateEntity;
module.exports.deleteEntity = deleteEntity;
module.exports.getEntitiesWithFilter = getEntitiesWithFilter;
