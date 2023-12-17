<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Одобренные командировки</h1>
          </div><!-- /.col -->
          <ul class="nav nav-pills ml-auto">
            <li class="nav-item">
              <a class="nav-link active" href="#" @click="logout" data-toggle="tab">Выход из аккаунта</a>
            </li>
          </ul>
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- /.row -->
        <!-- Main row -->
        <div class="row">
          <!-- Left col -->
          <section class="col-lg-12 connectedSortable">
            <!-- /.card-header -->
            <div class="card">
              <div class="card-header">
                <div class="card-body table-responsive p-0">
                  <div style="margin-bottom: 20px; display: flex; align-items: center;">
                      <button type="button" class="btn btn-lg btn-primary" style="margin-right: 20px;" @click="filter()">
                        Фильтрация (статусы)
                      </button>
                      <div>
                        <div style="display: flex;">
                          <form style="width: 100%; margin-right: 30px;">
                            <div class="form-group" style="margin-bottom: 0;">
                              <div style="display: flex;">
                                <input type="text" class="form-control" id="reason" placeholder="Найти страну" v-model="countrySearch">
                                <button type="button" class="btn btn-secondary" @click="searchCountry(countrySearch)" data-dismiss="modal">Применить</button>
                              </div>
                            </div>
                          </form>
                          <form style="width: 100%;">
                            <div class="form-group" style="margin-bottom: 0;">
                              <div style="display: flex;">
                                <input type="text" class="form-control" id="reason" placeholder="Найти город" v-model="citySearch">
                                <button type="button" class="btn btn-secondary" @click="searchCity(citySearch)" data-dismiss="modal">Применить</button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  <table class="table table-hover text-nowrap">
                    <thead>
                    <tr>
                      <th>Страна</th>
                      <th>Город</th>
                      <th>Организация</th>
                      <th>Начальная дата</th>
                      <th>Конечная дата</th>
                      <th>Цель</th>
                      <th>Статус</th>
                      <th>Затраты</th>
                    </tr>
                    </thead>
                    <tbody>
                      <tr v-for="request in (
                              filterStatus == [] && citySearch === '' && countrySearch === ''
                              ? allRequests
                              : requests
                          )" :key="request.id">
                      <td>{{ request.country }}</td>
                      <td>{{ request.city }}</td>
                      <td>{{ request.organization }}</td>
                      <td>{{ request.startDate }}</td>
                      <td>{{ request.endDate }}</td>
                      <td>{{ request.goal }}</td>
                      <td>
                          <span v-if="request.status === 'ACCEPTED'">Принята</span>
                          <span v-else-if="request.status === 'REJECTED'">Отклонена</span>
                          <span v-else-if="request.status === 'CLOSED'">Закрыта</span>
                          <span v-else>Создана</span>
                      </td>
                      <tr>
                            <td :colspan="2">
                              <div>
                                <span @click="showAdditionalInfo[request.id] = !showAdditionalInfo[request.id]">
                                  <i :class="showAdditionalInfo[request.id] ? 'fa fa-chevron-down' : 'fa fa-chevron-right'"></i>
                                </span>
                              </div>
                              <div v-show="showAdditionalInfo[request.id]"
                                   v-for="expenseList in request.expensesList">
                                  <span>{{ expenseList.name }}: {{ expenseList.price }}</span><br>
                              </div>
                            </td>
                          </tr>
                      <td>
                        <button type="button" class="btn btn-success btn-lg"
                                @click="take(request.id)">
                          Взять в обработку
                        </button>
                      </td>
                    </tr>
<!--                    <button  @click="getFile()">Download file</button>-->

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- /.card-body -->
          </section>
          <!-- /.Left col -->
        </div>
        <!-- /.row (main row) -->
      </div><!-- /.container-fluid -->
    </section>

    <!-- /.content -->
  </div>
  <div class="modal fade" id="filterModal" tabindex="-1" role="dialog" aria-labelledby="rejectModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="rejectModalLabel">Фильтрация по статусам</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <!--<label for="reason">Выберите статус</label>-->
                <select class="form-control" v-model="filterStatus" multiple required>
                  <option disabled>Выберите статусы</option>
                  <option value="ACCEPTED">Принята</option>
                  <option value="REJECTED">Отклонёна</option>
                  <option value="CLOSED">Закрыта</option>
                </select>
              </div>
              <!--<div class="form-group">
                <select class="form-control" v-model="filterStatus" multiple required>
                  <option disabled>Выберите статус</option>
                  <option value="ACCEPTED">Принята</option>
                  <option value="REJECTED">Отклонёна</option>
                  <option value="CLOSED">Закрыта</option>
                </select>
              </div>-->
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="filterSubmit()" data-dismiss="modal">Применить</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      file: '',
      countrySearch: '',
      citySearch: '',
      allRequests: [],
      requests: [],
      showAdditionalInfo: {},
    };
  },
  mounted() {
    this.fetchRequests();
  },
  methods: {
    filter() {
      this.countrySearch = ''
      this.citySearch = ''
      $('#filterModal').modal('show');
    },
    filterSubmit() {
      this.requests = this.allRequests.filter(request => {
        return this.filterStatus.includes(request.status);
      });
    },
    searchCountry(country) {
      this.countrySearch = country
      this.requests = this.allRequests.filter(request =>
        request.city && this.countrySearch && request.country.toLowerCase().includes(this.countrySearch.toLowerCase())
      );
    },
    searchCity(city) {
      this.citySearch = city
      this.requests = this.allRequests.filter(request =>
        request.city && this.citySearch && request.city.toLowerCase().includes(this.citySearch.toLowerCase())
      );
    },
    fetchRequests() {
      const token = localStorage.getItem('token')

      axios.get('http://localhost:8400/manager/accepted-requests', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
          .then(response => {
            this.allRequests = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    },
    toggleAdditionalInfo(requestId) {
        // При клике на стрелку, переключаем значение флага для конкретной заявки
        if (this.showAdditionalInfo[requestId]) {
          this.showAdditionalInfo[requestId] = false;
        } else {
          this.showAdditionalInfo[requestId] = true;
        }
      },
    take(requestId) {
      const token = localStorage.getItem('token')

      axios.put(
            'http://localhost:8400/manager/take-requests/' + requestId,
            null,
            {
              headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            }
          )
            .then(response => {
              this.requests = response.data;
            })
            .catch(error => {
              console.error(error);
            });
      // this.$router.push({path: '/accountant/request/item/' + requestId});
    },
    logout() {
      localStorage.clear(); // Очищаем localStorage

      // Делаем редирект на определенный маршрут
      this.$router.push('/');
    },
    //TODO:
    getFile() {
      const token = localStorage.getItem('token')
      axios.get('http://localhost:8400/file', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
          .then(response => {
            const blob = new Blob([response.data], {type: 'application/html'})
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = "filename.html"
            link.click()
            URL.revokeObjectURL(link.href)
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
}
</script>