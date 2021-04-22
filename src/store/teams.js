import TeamService from '@/services/team.service';
import Team from '@/store/models/team';

export default {
  namespaced: true,
  state: {
    isModalOpen: false,
  },
  mutations: {
    isModalOpen(state, isOpen) {
      state.isModalOpen = isOpen;
    },
  },
  actions: {
    async init({ dispatch }) {
      await dispatch('data/migrate', null, { root: true });

      await Promise.all([
        dispatch('clients/terminate', null, { root: true }),
        dispatch('bankAccounts/terminate', null, { root: true }),
        dispatch('invoices/terminate', null, { root: true }),
        dispatch('taxes/terminate', null, { root: true }),
      ]);

      await dispatch('getTeam');

      dispatch('clients/init', null, { root: true });
      dispatch('bankAccounts/init', null, { root: true });
      dispatch('invoices/init', null, { root: true });
      dispatch('taxes/init', null, { root: true });
    },
    async terminate() {
      return Team.deleteAll();
    },
    async getTeam() {
      const team = await TeamService.getTeam();
      await Team.create({ data: team });
      return team;
    },
    async teamProps({ getters }, props) {
      return getters.team.$update(props);
    },
    async updateTeam({ getters, dispatch }, props) {
      if (props) {
        await dispatch('teamProps', props);
      }
      return TeamService.updateTeam(getters.team);
    },
  },
  getters: {
    team() {
      return Team.query().with(['fields']).first();
    },
  },
};
