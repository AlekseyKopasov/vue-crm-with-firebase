<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'Category_Create' | localize }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
            />
          <label for="name">{{ 'Category_Label' | localize }}</label>
          <span
            v-if="$v.title.$dirty && !$v.title.required"
            class="helper-text invalid"
            >
            {{ 'Category_Error-Title' | localize }}
          </span>
        </div>

        <div class="input-field">
          <input id="limit" type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
            />
          <label for="limit">{{ 'Category_Limit' | localize }}</label>
          <span class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            >
            {{ 'Category_Error-MinValue' | localize }} {{ $v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ 'Category_CreateBtn' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import M from 'materialize-css/dist/js/materialize.min'

export default {
  data: () => ({
    title: '',
    limit: 1
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(1) }
  },
  mounted () {
    M.updateTextFields()
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.$emit('created', category)
        this.title = ''
        this.limit = 1
        this.$v.$reset()
        console.log(category)
        this.$message('Категория была создана')
      } catch (e) {}
    }
  }
}
</script>

<style>
</style>
