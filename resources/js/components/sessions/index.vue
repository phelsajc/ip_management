<template>
  <div class="wrapper">
    <navComponent></navComponent>
    <sidemenuComponent></sidemenuComponent>
    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2"></div>
        </div>
      </section>
      <section class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">&nbsp;</h3>
                  <button
                    type="button"
                    @click="showModal = true;ipadd_id=0"
                    class="btn btn-primary btn-sm pull-left"
                  >
                    Add
                  </button>
                </div>
                <div class="card-body">
                  <table class="table table-bordered">
                    <tr>
                      <th>IP Address</th>
                      <th>Comments</th>
                      <th>Actions</th>
                    </tr>
                    <tr v-for="e in filtersearch" :key="e.id">
                      <td>
                        {{ e.ipaddress }}
                      </td>
                      <td>
                        {{ e.desc }}
                      </td>
                      <td>
                        <button type="button" @click="editIp(e.id)" class="btn btn-success">Edit</button>
                      </td>
                    </tr>
                  </table>            
                </div>
              </div>
            </div>
          </div>
        </div>
        <ipAddressModal
          v-if="showModal"
          @close="showModal = false"
          :ipid="ipadd_id"
          v-on:close="filterEmployee"
        >
        </ipAddressModal>
      </section>
    </div>
    <footerComponent></footerComponent>
  </div>
</template>
<script type="text/javascript">
import api from "../../Helpers/api";
export default {
  created() {
    this.filterEmployee();
  },
  data() {
    return {
      ipadd_id: 0,
      showModal: false,
      ipadd_list: [],
    };
  },
  computed: {
    filtersearch() {
      return this.ipadd_list.filter((e) => {
        return e.ipaddress.match(this.searchTerm);
      });
    },
  },
  methods: {
    filterEmployee() {
      this.ipadd_list = [];
      this.countRecords = null;
      this.isHidden = false;
      api
        .post("ipaddress-list")
        .then((response) => {
          this.ipadd_list = response.data.data;
          this.countRecords = response.data.count;
          this.isHidden = true;
        })
        .catch((error) => (this.errors = error.response.data.errors));
    },
    editIp(e){
      this.ipadd_id = e
      this.showModal = true
    }
  },
};
</script>
