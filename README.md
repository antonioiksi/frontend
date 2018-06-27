# Installation guide for Florizel frontend

## Requirements
Install node v6.11


## Installation guide
1. install nvm
1. install node v6.11
1. clone latest repo
1. run `npm rebuild`
1. check constants `/src/services/constants.js`
1. run project 'npm start'



## Clone project
`
git clone -b latest https://github.com/antonioiksi/frontend
`

## Rebuild all node modules

```
cd florizel-frontend
npm rebuild
```

## Setup backend IP
Change IP address for backend and auth server
`/src/services/constants.js`

## Start frontend
```
npm start
```


#install as service

1. Create file `frontend.service` in folder  `/etc/systemd/system`
```sh
[Unit]
Description=frontend

[Service]
ExecStart=/bin/bash -c "/usr/bin/npm start --prefix /var/opt/frontend"

[Install]
WantedBy=multi-user.target
```

1. Setup autostart service
```
systemctl enable frontend.service
```

1. Enable service
```
systemctl enable florizel.service
```




  







