<template>
    <div>
        <div class="container-fluid app__content">
            <div class="row justify-content-center">
                <div class="min-vh-100 col-xl-10 col-xxl-8 pb-5">
                    <transition name="fade" mode="out-in">
                        <router-view/>
                    </transition>
                </div>
            </div>
        </div>
        <ClientModal v-if="team"/>
        <BankAccountModal v-if="team"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ClientModal from '@/components/clients/ClientModal';
import BankAccountModal from '@/components/bank-accounts/BankAccountModal';


export default {
  components: {
    BankAccountModal,
    ClientModal,
  },
  computed: {
    ...mapGetters({
      team: 'teams/team',
    }),
  },
};
</script>
