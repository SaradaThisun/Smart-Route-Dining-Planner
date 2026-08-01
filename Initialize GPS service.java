@Override
protected void onCreate(Bundle savedInstanceState) {

    super.onCreate(savedInstanceState);

    setContentView(R.layout.activity_main);


    fusedLocationClient =
            LocationServices.getFusedLocationProviderClient(this);


    getCurrentLocation();

}