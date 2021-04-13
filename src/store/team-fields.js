import TeamField from '@/store/models/team-field';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    init() {},
    terminate() {},
    async teamFieldProps(store, payload) {
      return TeamField.update({
        where: payload.fieldId,
        data: payload.props,
      });
    },
    async updateTeamField({ dispatch }, payload) {
      await dispatch('teamFieldProps', payload);
      return dispatch('teams/updateTeam', null, { root: true });
    },
    async addNewField(store, teamId) {
      const field = await TeamField.createNew();
      field.$update({
        team_id: teamId,
      });
    },
    async deleteTeamField({ dispatch }, fieldId) {
      await TeamField.delete(fieldId);
      return dispatch('teams/updateTeam', null, { root: true });
    },
  },
};
