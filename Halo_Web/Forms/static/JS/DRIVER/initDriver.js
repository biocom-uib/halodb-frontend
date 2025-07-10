function initDriver(mainId) {

    const stepsDict={
        index:[
            {
                element: '#Searcher',
                popover: {
                    title: 'Searcher',
                    description: 'Look into HaloFiles public Samples repository using this searcher!',
                    position: 'right'
                }
            },
            {
                element: '#advancedSearch',
                popover: {
                    title: 'Advanced Searcher',
                    description: 'Navigate into HaloFiles public Sample repositori with sofisticated filters',
                    position: 'right'
                }
            },
        ],
        profile:[
            {
            element: '#userData',
            popover: {
                title: 'User Data',
                description: 'Here you can check all your account information. Click on edit to change any of this fields',
                position: 'right'
            }
            },
            {
            element: '#profileSamples',
            popover: {
                title: 'My Samples',
                description: 'Here you can check your non-public samples',
                position: 'right'
            }
            },
            {
            element: '#addSampleBtn',
            popover: {
                description: 'Click on this button when you wanna add a new Sample!',
                position: 'right'
            }
            },
            {
            element: '#experimentsSection',
            popover: {
                title: 'My Groups',
                description: 'Create, accept & invite other users using this section',
                position: 'right'
            }
            },
            {
            element: '#sharedSamples',
            popover: {
                title: 'Shared with me',
                description: 'You can check all shared Samples here!',
                position: 'right'
            }
            }
        ]
    }

  const driver = window.driver.js.driver;

if(stepsDict[mainId]){
  const driverObj = driver({
    showProgress: true,
    nextBtnText: 'Next',
    prevBtnText: 'Back',
    doneBtnText: 'Close',
    steps:stepsDict[mainId]
  });



  document.getElementById('helpBtn').addEventListener('click', function () {
    driverObj.drive();
  });}
}
