<template>
  <footer>
      <b-row align-h="center" align-v="center">
        <b-col class="footer-col" mg="4">
          This project is merely for demo purposes.
          The images shown in this project are randomly loaded from the <a href="https://picsum.photos/" target="_blank"><b>Lorem Picsum API</b></a>

        </b-col>
        <b-col class="footer-col contacts" md="4">
          Contact me using:
          <b-row>
            <b-col md="12">
              <a href="mailto:brent.willems001@gmail.com" target="_blank"><b-icon-envelope-open></b-icon-envelope-open><b> Mail</b></a>
            </b-col>
            <b-col md="12">
              <a href="https://www.linkedin.com/in/brent-willems-cs/" target="_blank"><b-icon-linkedin></b-icon-linkedin><b> LinkedIn</b></a>
            </b-col>
          </b-row>


        </b-col>
        <b-col class="footer-col" md="4">
            <b-row>
              <b-col md="12">
                Code and design by: <a href="https://www.linkedin.com/in/brent-willems-cs/" target="_blank"><b>Brent Willems</b></a>
              </b-col>
              <b-col md="12">
                Copyright &copy; {{currentYear}}
              </b-col>
            </b-row>

        </b-col>
      </b-row>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  computed:{
    currentYear(){
      return new Date().getFullYear()
    }
  }
}

</script>

<style scoped>

a{
  color: #F49E4C;
}

a:hover{
  color: #77867F;
}

.contacts a{
  color: #0091AD;
}

.contacts a:hover{
  color: #77867F;
}
footer{
  text-align: center;
}

.footer-col{
  margin: 0.5rem 0;
}
</style>