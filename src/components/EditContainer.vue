<template>
  <div class="main">
      <h3>Edit Container</h3>

    <table class="table table-hover">
        <tbody>
            <tr>
            <td>Id:</td><td colspan="2">3</td>
            </tr>
            <tr>
                <td>Update Frequency:</td>
                <td>
                    <select>
                        <option value="10">10minutes</option>
                        <option value="30">30minutes</option>
                        <option value="60">60minutes</option>
                        <option value="120">2hours</option>
                        <option value="360">6hours</option>
                        <option value="720">12hours</option>
                        <option value="1440">24hours</option>
                    </select>
                </td>
                <td><button type="button" class="btn btn-primary">Submit</button></td>
            </tr>
            <tr>
                <td>Food Type:</td>
                <td>
                    <select>
                        <option value="coffee">Coffee</option>
                        <option value="cashew nuts">Cashew Nuts</option>
                        <option value="sugar">Sugar</option>
                        <option value="eggs">Eggs</option>
                    </select>
                </td>
                <td><button type="button" class="btn btn-primary">Submit</button></td>
            </tr>
            <tr>
                <td>Container Weight:</td><td>0.05kg</td><td><button type="button" class="btn btn-warning">Update</button></td>
            </tr>
            <tr>
                <td>Max capacity:</td><td>5.0kg</td><td><button type="button" class="btn btn-warning">Update</button></td>
            </tr>
            <tr>
                <td>Current Amount:</td><td>2.0kg</td><td><button type="button" class="btn btn-warning">Update</button></td>
            </tr>
            <tr>
                <td>Time to Sleep:</td><td colspan="2">Sleeping...</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.main {
  margin-top: 50px;
}
</style>


