<template>
    <div>
        <div class="container app__content">
            <div class="row justify-content-center">
                <div class="d-flex flex-column justify-content-between col-12 min-vh-100 pt-5 pb-2">
                    <transition name="fade" mode="out-in">
                        <router-view/>
                    </transition>
                    <footer class="col-12 d-flex justify-content-between align-items-center text-secondary px-0 mt-3 d-print-none">
                        <button class="btn btn-sm text-secondary" @click="toggleTheme">
                            Lights {{ theme === 'dark' ? 'on' : 'off' }}
                            <i class="material-icons material-icons-round md-14 align-text-bottom ml-1">
                                {{ theme === 'dark' ? 'wb_sunny' : 'brightness_2' }}
                            </i>
                        </button>
                        <div>
                            <small v-b-tooltip.hover
                                   title="All your data is saved in your browser and not on any server.
                                   This application is truly serverless and only you have access to your data."
                                   class="pointer">
                                What about my data?
                            </small>
                            <small class="pl-2">
                                Made with
                                <i class="material-icons material-icons-round md-14 align-text-bottom">favorite</i>
                                by
                                <a href="https://mokuapp.io/" class="text-secondary" target="_blank">Moku</a>.
                            </small>
                            <a href="https://github.com/mokuappio/serverless-invoices"
                               class="btn btn-sm btn--icon ml-2"
                               target="_blank">
                                <img src="@/assets/img/github.png"
                                     alt="Serverless Invoices Github"
                                     v-if="theme === 'dark'">
                                <img src="@/assets/img/github-dark.png"
                                     alt="Serverless Invoices Github"
                                     v-else>
                            </a>
                            <a  href="https://app.mokuapp.io/"
                                class="btn btn-sm btn-primary ml-2"
                                target="_blank">Upgrade</a>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
        <ClientModal v-if="team"/>
        <BankAccountModal v-if="team"/>
        <ImportModal/>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import ClientModal from '@/components/clients/ClientModal';
import BankAccountModal from '@/components/bank-accounts/BankAccountModal';
import { VBTooltip } from 'bootstrap-vue';
import ImportModal from '../../components/ImportModal';


export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    ImportModal,
    BankAccountModal,
    ClientModal,
  },
  computed: {
    ...mapGetters({
      team: 'teams/team',
    }),
    ...mapState({
      theme: state => state.themes.theme,
    }),
  },
  methods: {
    toggleTheme() {
      if (this.theme === 'light') {
        this.$store.commit('themes/theme', 'dark');
      } else {
        this.$store.commit('themes/theme', 'light');
      }
      localStorage.setItem('theme', this.theme);
      document.documentElement.setAttribute('data-theme', this.theme);
    },
  },
};
</script>
