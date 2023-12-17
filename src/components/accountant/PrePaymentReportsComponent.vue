<template>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Список авансовых отчётов</h1>
          </div><!-- /.col -->
          <ul class="nav nav-pills ml-auto">
            <li class="nav-item">
              <a class="nav-link active" style="margin-right:10px" href="/accountnt/changePassword">Генерация
                документа</a>
            </li>
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
                  <table class="table table-hover text-nowrap">
                    <thead>
                    <tr>
                      <th>ФИО</th>
                      <th>Дата создания</th>
                      <th>Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="request in requests" :key="request.id">
                      <td>{{ request.fio }}</td>
                      <td>{{ request.dataOfCreated }}</td>
                      <td>{{ request.status }}</td>
                      <td>
                        <button type="button" class="btn btn-lg btn-danger"
                                @click="reject(request.id)">
                          Отклонить
                        </button>
                      </td>
                      <td>
                        <button type="button" class="btn btn-lg btn-primary"
                                @click="close(request.id)">
                          Закрыть
                        </button>
                      </td>
                      <td>
                        <button type="button" class="btn btn-lg btn-primary"
                                @click="downloadFile(request.id)">
                          Скачать чеки
                        </button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <div class="alert alert-danger" v-if="error !== ''">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <!-- Блок ошибок -->
                    <span>{{ error }}</span>
                  </div>
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
  <div class="modal fade" id="rejectModal" tabindex="-1" role="dialog" aria-labelledby="rejectModalLabel"
       aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="rejectModalLabel">Отклонение запроса</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="reason">Причина отклонения</label>
              <input type="text" class="form-control" id="reason" v-model="rejectReason">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
          <button type="button" class="btn btn-primary" @click="submitReject">Отклонить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>

<script>
import axios from 'axios'
import AWS from 'aws-sdk';

export default {
  data() {
    return {
      requestId: '',
      rejectReason: '',
      requests: [],
      error: '',
      showAdditionalInfo: {}
    };
  },
  mounted() {
    this.fetchRequests();
  },
  methods: {
    fetchRequests() {
      const token = localStorage.getItem('token')

      axios.get('http://localhost:8400/expense-report', {
        headers: {
          //'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
          .then(response => {
            if (response.data.message) {
              this.error = response.data.message; // Заменяем текущий массив сообщений новым сообщением
            } else {
              this.requests = response.data;
              this.error = ''; // Очищаем массив ошибок, так как операция прошла успешно


            }
          })
          .catch(error => {
            console.error(error);
          });
    },
    reject(requestId) {
      this.requestId = requestId;
      $('#rejectModal').modal('show');
    },
    submitReject(requestId) {
      const token = localStorage.getItem('token')
      axios.post('http://localhost:8400/expense-report/' + this.requestId + '/Отклонен',
          {
            message: this.rejectReason
          },
          {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }).then(response => {
        if (response.data.message) {
          this.error = response.data.message; // Заменяем текущий массив сообщений новым сообщением
        } else {
          window.location.reload();
        }
      }).catch(error => {
            // Обработка ошибок
            console.error(error);
          }
      )
    },
    close(requestId) {
      const token = localStorage.getItem('token')

      axios.post('http://localhost:8400/expense-report/' + requestId + '/Закрыт',
          {
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }).then(response => {
        if (response.data.message) {
          this.error = response.data.message; // Заменяем текущий массив сообщений новым сообщением
        } else {
          window.location.reload();
        }
      }).catch(error => {
            // Обработка ошибок
            console.error(error);
          }
      )
    },
    async downloadFile(requestId) {
      const token = localStorage.getItem('token')


      const downloadPdf = (filePath) => {
        const blob = new Blob([filePath], {type: 'application/pdf'})
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = "filename.pdf"
        link.click()
        URL.revokeObjectURL(link.href)
      }

      function downloadFile(byteArray, type, fileName) {
        const blob = new Blob([byteArray], {type})
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;

        link.style.display = 'none';
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
      }

      const filePaths = this.requests.find(value => value.id === requestId).filePaths;

      await Promise.all(filePaths.map(path => {
        axios.post('http://localhost:8400/file', {filePath: path}, {
          headers: {
            'Accept': 'application/pdf',
            'Authorization': `Bearer ${token}`
          },  responseType: 'arraybuffer',
        }).then(result => {
          console.log(result.data)
          downloadPdf(result.data)
        })
      }))
      // axios.get('http://localhost:8400/expense-report/files/' + requestId, {
      //   headers: {
      //     'Content-type': 'application/json',
      //     'Accept': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   }
      // })
      //     .then(response => {
      //       const filesMap = response.data;
      //       for (const [filename, fileBytes] of Object.entries(filesMap)) {
      //         console.log('Длина данных файла', filename, ':', fileBytes.length, 'байт');
      //         console.log('Тип содержимого файла', filename, ':', typeof fileBytes);
      //
      //         const blob = new Blob([fileBytes], {type: 'application/pdf'});
      //         const link = document.createElement('a');
      //         link.href = window.URL.createObjectURL(blob);
      //         if (filename.split('pdf').length > 1) {
      //           link.download = filename;
      //         } else {
      //           link.download = filename + ".pdf"
      //         }
      //         link.click();
      //       }
      //     })
      //     .catch(error => {
      //       console.error(error);
      //     });

    },
    logout() {
      localStorage.clear(); // Очищаем localStorage

      // Делаем редирект на определенный маршрут
      this.$router.push('/');
    }
  }
}
</script>