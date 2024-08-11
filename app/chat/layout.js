import { AppBar, Toolbar, Typography, Button } from '@mui/material';


function Layout({ children }) {
  return (
    <div>
      {/* <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h4" noWrap component="div" className="gradient-text font-extrabold">
            Quantum
          </Typography>
          <Button variant="contained" className='button-2'>
            Sign In
          </Button>
        </Toolbar>
      </AppBar> */}
      <main>{children}</main>
    </div>
  );
}

export default Layout;
