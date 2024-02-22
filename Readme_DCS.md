# SETUP
This acts as main repository for the CUT-Prototyp front-end and is connected to the CICD.
It allows merging updates from the LGV-maintained masterportal base via the masterportal-dev-lgv branch

and references the repositories 
- portal:   github.com/digitalcityscience/CUT_Prototyp_masterportal__user
- addons: github.com/digitalcityscience/CUT_Prototyp_masterportal_addon

as *submodules* so that they can be deployed in their preferred state.

# RUN IN DOCKER  (production mode)
- clone this repo
  
> git submodule init

> git submodule update --recursive

> docker build -t "cut-prototyp" .

> docker run -p 80:80 cut-prototyp

## Branches
### masterportal-dev-lgv

**Run once when you setup this project**
> git remote add origin-bitbuck https://bitbucket.org/geowerkstatt-hamburg/masterportal.git


**To update the base masterportal**
>git checkout masterportal-dev-lgv
>git pull origin-bitbuck dev

keep your .gitignore in case of issues.

then merge the updates into the main branch. 

### main
This contains the repositories
- portal:  git clone git@github.com:digitalcityscience/CUT_Prototyp_masterportal__user.git portal
- addons: git clone git@github.com:digitalcityscience/CUT_Prototyp_masterportal_addon.git addons

as submodules. 

To pull and persist updates from the submodules run
> git submodule update --recursive --remote 

### Deployment of changes in portal or addon repos

update submodules with > git submodule update --recursive --remote

push to main

CICD will deploy changes via .drone.yml
