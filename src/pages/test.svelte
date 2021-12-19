<Page>
  <Navbar title="Test" backLink="Back" />
  <List inset>
  <ListInput
  type="datepicker"
  placeholder={'Select Date Time'}
 
  validate
  
  calendarParams={{openIn: 'customModal', header: true, footer: true,  dateFormat: 'MM dd yyyy H::mm A', timePicker: true }}
></ListInput>
</List>
</Page>
<script>
  import { Page, Navbar, List,ListInput } from 'framework7-svelte';
</script>
