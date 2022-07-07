<script>
import { mapState } from 'vuex';

import UserSearchForm from '@/components/UserSearchForm';
import UserProfile from '@/components/UserProfile';

export default {
  name: 'UserView',
  components: {
    UserSearchForm,
    UserProfile,
  },
  computed: {
    ...mapState({
      user: 'user',
    }),
  },
};
</script>

<template>
  <div>
    <UserSearchForm />
    <UserProfile :user="user" />
  </div>
</template>
