private void getCurrentLocation(){


    if(ActivityCompat.checkSelfPermission(
            this,
            Manifest.permission.ACCESS_FINE_LOCATION)
            != PackageManager.PERMISSION_GRANTED){


        ActivityCompat.requestPermissions(
                this,
                new String[]{
                    Manifest.permission.ACCESS_FINE_LOCATION
                },
                100
        );

        return;
    }


    fusedLocationClient
            .getLastLocation()
            .addOnSuccessListener(location -> {


                if(location != null){


                    currentLatitude =
                            location.getLatitude();


                    currentLongitude =
                            location.getLongitude();


                    System.out.println(
                    "Latitude : "
                    + currentLatitude);


                    System.out.println(
                    "Longitude : "
                    + currentLongitude);


                }


            });


}