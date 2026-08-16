public class RouteActivity extends AppCompatActivity {


    Button currentLocationBtn;
    Button findRouteBtn;

    EditText startLocation;
    EditText destination;


    FusedLocationProviderClient locationClient;


    double latitude;
    double longitude;



    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_route);



        currentLocationBtn =
        findViewById(R.id.currentLocationBtn);


        findRouteBtn =
        findViewById(R.id.findRouteBtn);


        startLocation =
        findViewById(R.id.startLocation);


        destination =
        findViewById(R.id.destination);



        locationClient =
        LocationServices
        .getFusedLocationProviderClient(this);



        currentLocationBtn.setOnClickListener(v -> {

            getCurrentLocation();

        });



        findRouteBtn.setOnClickListener(v -> {


            String start =
            startLocation.getText().toString();


            String end =
            destination.getText().toString();



            System.out.println(
            "Starting Point : "+start);


            System.out.println(
            "Destination : "+end);


        });


    }
